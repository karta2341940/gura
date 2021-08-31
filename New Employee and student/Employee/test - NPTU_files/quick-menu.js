document.addEventListener('DOMContentLoaded', function () {

    let quickMenuSetting = getQuickMenuSettings();

    /**
     * Get the quick menu settings from the local storage.
     * @returns {Object} A dictionary of the quick menu settings
     * */
    function getQuickMenuSettings() {
        let quickMenuSetting = {};
        try {
            quickMenuSetting = JSON.parse(localStorage.getItem('quickMenu') || quickMenuSetting);
        } catch (e) {
            return {};
        }
        return quickMenuSetting;
    }

    /**
     * delete the settings in quick menu and reload the page.
     * @returns {undefined}
     * */
    function cleanQuickMenuSettings() {
        localStorage.removeItem('quickMenu');
        quickMenuSetting = getQuickMenuSettings();
        loadQuickMenu();
        location.reload();
    }

    /**
     * Get the most used links.
     * @returns {Array}
     * */
    function getTopClicked() {
        let result = Object.keys(quickMenuSetting).map(function (key) {
            return [key, quickMenuSetting[key]];
        });
        result.sort(function (a, b) {
            // TODO: make sure key exists in 'a' and 'b' to avoid error.
            let countA = a[1]['count'];
            let countB = b[1]['count'];
            console.log(countA, countB, countA > countB);
            return countB - countA;
        });
        return result;
    }

    /**
     * Load the quick menu on the page.
     * @returns {undefined}
     * */
    function loadQuickMenu() {
        let quickMenu = document.getElementById('quick-menu-list');
        let quickMenuLink = quickMenu.querySelectorAll('a');
        let topClicked = getTopClicked();

        // If there is no saved data before, then don't load the QuickMenu.
        if (topClicked.length === 0) return;

        // Change the title of quick menu and disply the option block.
        document.getElementById('freq-title').innerText = '最常使用的連結';
        document.getElementById('freq-options').style.display = 'block';

        let isReachedTopClickedEnd = false;
        quickMenuLink.forEach(function (link, index) {
            // Remove all element after reached top clicked end.
            if (typeof topClicked[index] === 'undefined') {
                isReachedTopClickedEnd = true;
            }
            if (isReachedTopClickedEnd) {
                link.parentElement.style.display = 'none';
                return;
            }
            let linkInfo = topClicked[index][1];
            link.querySelector('.freq-content').childNodes[0].nodeValue = linkInfo['title']; // change the text only without changing other child nodes
            link.setAttribute('title', `此連結使用過${linkInfo['count']}次`);
            link.setAttribute('href', linkInfo['url']);
            link.parentElement.style.display = 'block';
        });
    }

    /** 
     * An event listener for each of the link.
     * @returns {undefined}
     * */
    function onEachLink(link) {

        let title = link.innerText;
        let url = link.getAttribute("href");

        // use 'title' as key to identify the link, or you can use some 
        // hash function with the link attributes to generate a unique key.
        const quickMenuSettingKey = title;

        // TODO: Clean up the 'quickMenuSetting'
        // the quickMenuSetting in localStorage may contain a old key
        // that is not exists in the current page, and that should be
        // clean up to make sure quickMenuSetting is clean.

        // To avoid the user use ctrl+click is not detected by the function,
        // we use mouseup instead of click.
        link.addEventListener('mouseup', function (e) {
            console.log('a');
            quickMenuSetting[quickMenuSettingKey] = quickMenuSetting[quickMenuSettingKey] || {};
            quickMenuSetting[quickMenuSettingKey].title = title;
            quickMenuSetting[quickMenuSettingKey].url = url;
            quickMenuSetting[quickMenuSettingKey].count = quickMenuSetting[quickMenuSettingKey].count || 0; // To make sure it is not undefined
            quickMenuSetting[quickMenuSettingKey]['count']++;
            localStorage.setItem('quickMenu', JSON.stringify(quickMenuSetting));
            loadQuickMenu();
        });
    }

    /* Load the quick menu after the page is loaded */
    loadQuickMenu();
    document.querySelectorAll('.cnc-link')
        .forEach(onEachLink);
    document.getElementById('btn-clean-freq')
        .addEventListener('click', cleanQuickMenuSettings);
});

