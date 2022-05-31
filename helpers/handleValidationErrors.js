module.exports.handleValidationErrors = (err)=>{
    let errors={};
    for(let key in err){
        errors[key]=err[key]["msg"]
    }
    return errors;
}
