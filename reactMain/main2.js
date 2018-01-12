requirejs(['bld\\bundle', "a2\\bld\\a2bundle", "loaders\\a2SubSystem"],
function   (s) {
    console.log('shane:', shane);
    console.log('a2shane:', a2shane);
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});


requirejs([
    'a2app\\inline.bundle',
    'a2app\\polyfills.bundle',
    'a2app\\styles.bundle',
    'a2app\\vendor.bundle',
//    'a2app\\main.bundle'
],
function   (a,b,c,d) {
    console.log('a2app loaded', require("a2app\\inline.bundle"));
});


