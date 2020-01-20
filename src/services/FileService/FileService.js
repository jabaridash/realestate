import XLSX from 'xlsx'

const columns = [
  "prop_type",
  "address",
  "short_price",
  "price",
  "price_raw",
  "beds",
  "baths",
  "baths_full",
  "sqft",
  "sqft_raw",
  "lot_size",
  "rdc_web_url",
  "office_name",
  "photo",
  "prop_status",
  "list_date",
  "last_update",
  "property_id",
  "listing_id",
  "advertiser_id",
]

class FileService {
  downloadFile(json) {
    if (!json.listings) {
      throw new Error("No listings present")
    }

    const cells = json.listings.map(listing => columns.map(key => listing[key]))
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...cells])
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, "results")
    XLSX.writeFile(workbook, 'results.xlsx')
  }
}

export default FileService
