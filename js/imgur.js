const submit = () => {
const file = document.querySelector('#imgLoader').files[0]
if (!file) return false

const formData = new FormData()
formData.append('image', file)

axios
.post('https://api.imgur.com/3/image', formData, {
headers: { Authorization: 'Client-ID 4ddb1cef2cbd23a' },
})
.then((res) => {
console.log(res)
document.querySelector('#imgurl').textContent = res.data.data.link
})
.catch((error) => {
console.log(error)
})
}

document.querySelector('#url').addEventListener('click', submit)
