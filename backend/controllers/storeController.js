const {
    addStore,
    getAllStores,
    getStoresForUser,
    getAllStoresAdmin,
    deleteStoreById
} = require("../models/storeModel");

const createStore = (req, res) => {

    addStore(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Store Added Successfully"
        });

    });

};

const getStores = (req, res) => {

    getAllStores((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

const userStores = (req,res)=>{

    const search = req.query.search || "";

    getStoresForUser(
        req.user.id,
        search,
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

const adminStores = (req, res) => {

    const search = req.query.search || "";

    getAllStoresAdmin(search, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

const deleteStore = (req, res) => {

    deleteStoreById(req.params.id, (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Store not found"
            });

        }

        res.json({
            message: "Store deleted successfully"
        });

    });

};

module.exports = {
    createStore,
    getStores,
    userStores,
    adminStores,
    deleteStore
};