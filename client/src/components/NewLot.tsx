
function NewLot() {
    return (
        <div className="text-center">
            <br/>
            <h1 className="mb-8 text-3xl text-center">New Lot</h1>
            <form action='/lots/createLot' method='post'>
                <div className="input-container">
                    <input placeholder="Lot Name" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" name="lotName" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Price" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number" name="price" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Address" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" name="address" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Total Spots" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number" name="spots" required />
                </div>
                <br/>
                <div className="w-half">
                    <button type="submit"   className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewLot