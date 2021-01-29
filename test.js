const getDistanceAndTravelTime = require('./index.js')


const init = async () => {
    try {
        let res = await getDistanceAndTravelTime(
            'ChIJu9iw5QNV4joRLU6j0di9u8Y',
            'ChIJqdk_8qVU4joRoWxqRZbWFLs',
            '---API KEY HERE---','driving')
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

init()
