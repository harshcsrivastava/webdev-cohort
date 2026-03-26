let subs: number | string = '1M'
subs = 1000000

let apiRequestStatus: 'pending' | 'success' | 'error' = 'pending'
// apiRequestStatus = "hitesh" --> Error
apiRequestStatus = "error"

const orders = ['12', '20', '28']

let currentOrder; //type any - bad
for (const order of orders) {
    if(order === '28'){
        currentOrder = order
        break
    }
}


console.log(currentOrder); //type string | undefind
