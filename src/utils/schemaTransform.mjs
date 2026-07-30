export const schemaTransform = {
    visual: true,
    versionKey: false,
    transform(doc, ret) {

        if (!ret.id && ret._id) {
            ret.id = ret._id.toString();
        }

        delete ret._id;

        return ret;
    }
};

// id _id User follow 