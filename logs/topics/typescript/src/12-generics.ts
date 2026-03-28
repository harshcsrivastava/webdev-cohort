// generics are also templates like interfaces(GENERAL FUNCTIONS)
// used in designing libraries and frameworks
function wrapInArray<T>(item: T): T[] {
    // T => Datatype
    return [item];
}

wrapInArray("Masala");
wrapInArray(23);
wrapInArray({ flavour: "Ginger" });

function pair<A, B>(a: A, b: B): [A, B] {
    return [a, b];
}

pair("masala", 20);
pair("masala", { flavour: "Ginger" });

// GENERIC INTERFACE
interface Box<T> {
    content: T;
}

const numberBox: Box<number> = {content: 23} //jis type ka box define kroge usi ka content define kroge
const numberBoxCup: Box<string> = {content: "23"} //jis type ka box define kroge usi ka content define kroge

// sabse jyada real world use API | Forms and React me use hota

interface ApiPromise<T> {
    status: number,
    data: T
}
// state management, axios etc
const res: ApiPromise<{flavour: string}> = {
    status: 200,
    data: {flavour: "masala"}
}