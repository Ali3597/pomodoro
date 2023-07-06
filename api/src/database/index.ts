import  mongoose from 'mongoose';

console.log(process.env.MONGO_USERNAME, "process.env.MONGO_USERNAME","il sont la");
console.log(process.env.MONGO_PWD, "process.env.MONGO_PWD","il sont la");
console.log(process.env.NODE_ENV,"voila mon environnement de node");
const uri = process.env.NODE_ENV === 'production' ?
`mongodb://${ process.env.MONGO_USERNAME }:${ process.env.MONGO_PWD }@db` :
`mongodb://db`;
console.log(uri,"voilalalallaallalalalalallalalalal mon uriii");
mongoose.connect( uri).then(() => {
    console.log('Connected !')
}).catch(e => console.log(e));