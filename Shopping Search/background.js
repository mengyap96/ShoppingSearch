//Creating class to store website information
var Provider = class Provider {
	constructor(name = '', icon = 'icons/other.png', url = '', selected = false) {
		this.name = name;
		this.icon = icon;
    this.url = url;
		this.selected = selected;
    }
}

//Storing website information into the class
const defaultProvider = [
  new Provider('Lazada', 'icons/lazada.png', 'https://www.lazada.com.my/catalog/?q=%s', true),
  new Provider('Shopee', 'icons/shopee.png', 'https://shopee.com.my/search?keyword=%s', true),
	new Provider('Presto', 'icons/presto.png', 'https://www.prestomall.com/totalsearch/TotalSearchAction/searchTotal.do?kwd=%s', true)
]

//Creating context menu for extension
chrome.contextMenus.create({
    id: "main-menu",
    title: "Shop this item",
    //Only create the menu when text are selected
    contexts: ["selection"],
});

//Creating context submenu
for(i=0;i<defaultProvider.length;i++){
    chrome.contextMenus.create({
        parentId: 'main-menu',
        id: i.toString(),
        icons: {
            64: defaultProvider[i].icon,
        },
        title: defaultProvider[i].name,
        contexts: ['selection'],
    });
}

//Create a new tab for result when user press the menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    browser.tabs.create({
        url:defaultProvider[parseInt(info.menuItemId)].url.replace('%s',info.selectionText),
    })

});

//Create a new tab for result when user press the shortcut key
chrome.commands.onCommand.addListener(function(command) {
    if(command == "search") {
      chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
      }, function(selection) {
        chrome.tabs.create({
            url:defaultProvider[0].url.replace('%s',selection[0]),
        })
      });
    }

  });

//Create a new tab for result when user press the toolbar icon
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
      }, function(selection) {
        chrome.tabs.create({
            url:defaultProvider[0].url.replace('%s',selection[0]),
        })
      });
});

