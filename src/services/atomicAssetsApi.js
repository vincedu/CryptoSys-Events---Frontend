async function getCollectionsByAccount() {
    const request = new XMLHttpRequest();
    request.open(
        'GET',
        'https://test.wax.api.atomicassets.io/atomicassets/v1/collections?author=accounttest2&match=accountest2&page=1&limit=100&order=desc&sort=created',
    );
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status === 200) {
            console.log('wouhou');
            console.log(JSON.parse(request.response).data.length);
            return JSON.parse(request.response).data;
        }
        console.log('fuck');
        return JSON.parse(request.response);
    };
}

export async function isFirstEventCreation() {
    if (getCollectionsByAccount().length === 0) {
        return true;
    }
    return false;
}
