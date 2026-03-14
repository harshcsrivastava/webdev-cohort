function bootNavigation(mapLoaded){
    try {
        console.log(`Is Nav loaded: ${mapLoaded}`);
        if(!mapLoaded)
            throw new Error("Map was not passed in this function")
        return "NAV_OK"
    } catch (error) {
        console.log(error);
        console.log(`Nav Failed: ${error.message}`);
    }finally{
        console.log("Sequence Completed");
        
    }
}

const status1 = bootNavigation(false)
console.log("Result: ", status1);
