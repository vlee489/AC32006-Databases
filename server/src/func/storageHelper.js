const { Suppliers } = require('../models/suppliers')
const { MaterialsCatalogue } = require('../models/materialsCatalogue')
const { SuppliersCatalogue } = require('../models/suppliersCatalogue')
const { Storage } = require('../models/storage');
const { IdError } = require('./errors');


async function getStorageItem(StorageID) {
    storageQuery = await Storage.query().findById(StorageID);
    if (!(storageQuery instanceof Storage)) {
        throw new IdError(`No item in storage is with StorageID:${StorageID}`)
    }
    materialsCatalogueQuery = await MaterialsCatalogue.query().findById(storageQuery.MaterialID)
    suppliersCatalogueQuery = await SuppliersCatalogue.query().where('MaterialID', materialsCatalogueQuery.MaterialID)
    supplierHold = []
    for (const s in suppliersCatalogueQuery) {
        supplierHold.push((await Suppliers.query().findById(suppliersCatalogueQuery[s].SupplierID)))
    }
    return {
        StorageID: storageQuery.StorageID,
        Stock: storageQuery.Stock,
        StorageLocation: storageQuery.StorageLocation,
        Material: {
            MaterialID: materialsCatalogueQuery.MaterialID,
            Name: materialsCatalogueQuery.Name,
            PartType: materialsCatalogueQuery.PartType,
            Price: materialsCatalogueQuery.Price,
            SKU: materialsCatalogueQuery.SKU,
            Description: materialsCatalogueQuery.Description,
            Weight: materialsCatalogueQuery.Weight,
            Suppliers: supplierHold
        }
    }
}

module.exports = {
    getStorageItem: getStorageItem
}