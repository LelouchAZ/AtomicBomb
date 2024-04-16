const express = require('express')
const fs = require('fs')

const app = express()
app.listen(3000,()=>{console.log("Server Initiated")})
app.use(express.json())


function getData(path){
    const data = fs.readFileSync(`${__dirname}/${path}`,'utf-8');
    return JSON.parse(data)
}

function insertData(newdata,path) {
    const data = getData(path);
    data.push(newdata)
    fs.writeFileSync(`${__dirname}/${path}`,JSON.stringify(data),'utf-8')
    console.log(getData(path))
}


app.get('/data',(req,res)=>{
    
    res.status(200).json({
        message:'success',
        data : getData('data')
    })
})

app.post('/save',(req,res)=>{
    const newData = req.body;
    console.log(newData)
    insertData(newData,'data')

    res.status(200).json(
        {
            message:"succes"
        }
    )

})

