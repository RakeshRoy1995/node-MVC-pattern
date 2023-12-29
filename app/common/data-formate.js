
const dataFormate = (dataFormate , dbData , isArray=true) => {
    let data = []

    if (isArray) {
        dbData.map((d)=>{
            let tmpData = {}
            dataFormate.map((data_f )=>{
                if ( d[data_f.db] ) {
                    tmpData[data_f.mine] = d[data_f.db]
                }
            })
            data.push(tmpData)
        })
        return data
    }else{
        let tmpData = {}
        for (const property in dbData) {
            dataFormate.map((data_f )=>{
                if ( data_f.db ==  property ) {
                    tmpData[data_f.mine] = dbData[property]
                }
            })
        }

        return tmpData
    }

    
};

const ProductTableFormateObj = [
    {
        db : "_id",
        mine: "product_id"
    },
    {
        db : "name",
        mine: "product_name"
    },
    {
        db : "description",
        mine: "product_description"
    },
    {
        db : "price",
        mine: "product_price"
    },
    {
        db : "status",
        mine: "product_status"
    },
    {
        db : "image",
        mine: "product_image"
    },
    {
        db : "createdAt",
        mine: "product_created"
    },
    {
        db : "updatedAt",
        mine: "product_updated"
    },
]


module.exports = {
    dataFormate,
    ProductTableFormateObj
}
