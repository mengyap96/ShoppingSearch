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


browser.contextMenus.create({
    id: "main-menu",
    title: "Shop this item",
    contexts: ["selection"],
});
asd
for(i=0;i<defaultProvider.length;i++){
    browser.contextMenus.create({
        parentId: 'main-menu',
        id: i.toString(),
        icons: {
            64: defaultProvider[i].icon,
        },
        title: defaultProvider[i].name,
        contexts: ['selection'],
    });
}

browser.contextMenus.onClicked.addListener((info, tab) => {
    
    console.log("Searched "+info.selectionText +"at "+info.menuItemId)
    
    browser.tabs.create({
        url:defaultProvider[parseInt(info.menuItemId)].url.replace('%s',info.selectionText),
    })

});

