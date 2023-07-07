import  mongoose from 'mongoose';


const uri = process.env.NODE_ENV === 'production' ?
`mongodb://${ process.env.MONGO_USERNAME }:${ process.env.MONGO_PWD }@db` :
`mongodb://db`;

mongoose.connect( uri).then(() => {
    console.log('Connected!')
}).catch(e => console.log(e));