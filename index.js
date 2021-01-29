const axios = require('axios')

module.exports =
    async function getDistanceAndTravelTime(fromPlaceId, toPlaceId, apiKey) {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${fromPlaceId}&destinations=place_id:${toPlaceId}&key=${apiKey}`

        try {
            let apiResponse = await axios.get(url)

            if (apiResponse.data.status === 'OK') {
                let distance = apiResponse.data.rows[0].elements[0].distance.text
                let travelTime = apiResponse.data.rows[0].elements[0].duration.text

                return {status: 'Success', distance, travelTime}
            }

            return {status: 'Failed', error: apiResponse.data.error_message}
        } catch (error) {
            if (error.response.data.status === 'INVALID_REQUEST')
                throw new Error(error.response.data.error_message)

            throw new Error(error.response)
        }
    }


