const axios = require('axios')

const travelModes = ['driving', 'walking', 'bicycling', 'transit']

module.exports =
    async function getDistanceAndTravelTime(fromPlaceId, toPlaceId, apiKey, travelMode = 'driving') {

        if (!validateTravelMode(travelMode)) return {status: 'Failed', error: 'Invalid travel mode'}

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${fromPlaceId}&destinations=place_id:${toPlaceId}&mode=${travelMode}&key=${apiKey}`

        try {
            let apiResponse = await axios.get(url)

            if (apiResponse.data.status === 'OK') {
                let distance = apiResponse.data.rows[0].elements[0].distance.text
                let travelTime = apiResponse.data.rows[0].elements[0].duration.text

                return {status: 'Success', distance, travelTime}
            }

            return {status: 'Failed', error: apiResponse.data.error_message}
        } catch (error) {
            throw new Error(error.response)
        }
    }

function validateTravelMode(mode) {
    return travelModes.includes(mode);
}
