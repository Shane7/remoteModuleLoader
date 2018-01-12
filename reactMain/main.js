const componentsToLoad = [
    {name: "dynam", url: "dynam", type:"r" },
    {name: "dynam2", url: "dynam2", type:"r" },
    {name: "Center", url: "Center", type:"r" },
    {name: "shane.SimpleComponent", url: "bld\\bundle", type:"r" },
    {name: "a2Mod1", url: "a2\\mod1\\bundle", type:"a2"}
];

let selectedCmp = undefined;
let _api = {test: 'test'};

const createLoadButton = (name, renderCmp) => {
    return React.createElement( 'button', { onClick: (event) => {
            selectedCmp = renderCmp;
            renderRoot();
        }
    }, name);
};

const createLoadButtonA2 = (name, renderCmp) => {
    return React.createElement( 'button', { onClick: (event) => {
            selectedCmp = undefined;
            renderRoot("a2Content");
            ng.platformBrowserDynamic.bootstrap(a2Mod1.XComponent);
        }
    }, name);
};

const renderRoot = (hostDivName) => {
    ReactDOM.render(
        React.createElement( 'div', {},
        React.createElement( 'img', { height: "30px", src: "http://blog-assets.risingstack.com/2016/Jan/react_best_practices-1453211146748.png" }),
        ...loadedComponents.map(c => {
            if(c.render) {
                return c.render();
            } else {
                if(c.type === 'a2') {
                    return createLoadButtonA2(c.name, c.component);
                } else {
                    return createLoadButton(c.name, c.component);
                }
            }
        }),
        (selectedCmp) ? selectedCmp({username: 'shane'}) : undefined,
        (hostDivName) ? React.createElement( hostDivName) : undefined
        ),
        document.getElementById('app')
    );
}

const loadA2 = (cmp) => {
        //cmp.parameters = [[{test: 'test'}]];
        ng.platformBrowserDynamic.bootstrap(cmp);
}

const contentLoaders = {
    r: (name, type, factoryFn) => {
        console.log('load a react component');
        //cache a reference to the factory function
        loadedComponents.push({name: name, component: factoryFn, type: type})
    },

    a2: (name, type, factoryFn) => {
        console.log('load an angular 2 component', name, window[name]);

        
        if(window[name] && window[name].getRouteMap) {
            var routeArray = window[name].getRouteMap();
            console.log('route map:', routeArray);
            routeArray.forEach(r => {
                loadedComponents.push({name: r.name, component: () => {}, type: type,
                    render: () => {
                        return React.createElement( 'button', { onClick: (event) => {
                            selectedCmp = undefined;
                            renderRoot(r.selector);
                            //r.component.parameters = [[new ng.core.Inject({test: 'test'})]];
                            ng.platformBrowserDynamic.bootstrap(r.component);
                        }
                    }, r.name);
                    }
                });
            });
        } else {
            console.log('no route map', name);
            loadedComponents.push({name: name, component: () => {}, type: type})
        }
        
    }
}

const loadedComponents = [];

function myRequire( url, name, type ) {
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
    ajax.onreadystatechange = function () {
        var script = ajax.response || ajax.responseText;
        if (ajax.readyState === 4) {
            switch( ajax.status) {
                case 200:
                    eval.apply( window, [script] );
                    console.log("script loaded: ", name);
                    break;
                default:
                    console.log("ERROR: script not loaded: ", url);
            }

            var factoryFn = window;
            name.split('.').forEach(tok => factoryFn = factoryFn[tok]);

            contentLoaders[type](name, type, factoryFn);

            renderRoot();            
        }
    };
    ajax.send(null);
}

componentsToLoad.forEach(cmp => {
    try {
        myRequire(`${cmp.url}.js`, cmp.name, cmp.type);
    } catch (err) {
        console.error(err);
    }
    
});

//from: https://reactarmory.com/guides/learn-react-by-itself/react-basics