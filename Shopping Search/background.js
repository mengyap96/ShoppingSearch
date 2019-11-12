var Provider = class Provider {
	constructor(name = '', icon = 'icons/other.png', url = '', selected = false) {
		this.name = name;
		this.icon = icon;
        this.url = url;
		this.selected = selected;
    }
}

const defaultProvider = [
    new Provider('Lazada', 'icons/lazada.png', 'https://www.lazada.com.my/catalog/?q=%s', true),
    new Provider('Shopee', 'icons/shopee.png', 'https://shopee.com.my/search?keyword=%s', true)
]




chrome.contextMenus.create({
    id: "main-menu",
    title: "Shop this item",
    contexts: ["selection"],
});


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

chrome.contextMenus.onClicked.addListener((info, tab) => {
    
    console.log("Searched "+info.selectionText +"at "+info.menuItemId)
    
    browser.tabs.create({
        url:defaultProvider[parseInt(info.menuItemId)].url.replace('%s',info.selectionText),
    })

});


// chrome.commands.onCommand.addListener(function(command) {
//     result = window.getSelection().toString();

//     console.log(result)
//     if (command == "search") {
//         browser.tabs.create({
//             url:defaultProvider[0].url.replace('%s',"blue"),
//         })
//     }
//   });

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