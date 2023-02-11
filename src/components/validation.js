const validation = (values) => {

    let errors={};

    if(!values.username){
        errors.username="name is required"
    }

    return errors;
}


export default validation;