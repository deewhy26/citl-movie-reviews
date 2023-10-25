const modelOptions={
    toJSON:{
        virtuals: true,
        transform: (_,obj)=>{
            delete obj._id;
            return obj;
        }
    },
    toObject: {
        virtuals: true,
        transform: (_,obj) =>{
            delete obj._id;
            return obj;
        }
    },
    versionKey: false,
    timestamps: true
};
// modelOptions object defines some common configurations used 
// when defining Mongoose schemas for MongoDB. It ensures that virtual properties 
// are included in the JSON and JavaScript object representations of the document while 
// excluding the version key and enabling automatic timestamp management.