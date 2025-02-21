const colors = [
    '#FF3B30', // Red (~0°)
    '#FF9500', // Orange (~30°)
    '#FFCC00', // Yellow (~45°)
    '#34C759', // Green (~145°)
    '#00FFFF', // Cyan (180°)
    '#5AC8FA', // Teal (~195°)
    '#007AFF', // Blue (~210°)
    '#5856D6', // Purple (~240°)
    '#FF00FF', // Magenta (300°)
    '#FF2D55', // Pink (~345°)
];

let btnToTop = document.querySelector('.btn-to-top');
window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (btnToTop.classList.contains('hidden')) btnToTop.classList.remove('hidden');
        console.log('Show');
    } else {
        if (!btnToTop.classList.contains('hidden')) btnToTop.classList.add('hidden');
    }
};
btnToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => {
        console.log('Data fetched');
        res.json()
            .then((data) => {
                console.log(data);
                document.querySelector('#app').innerHTML = `
                    <div class="w-full flex flex-col justify-center px-5">
                        <h1 class="font-[arial] font-bold text-4xl text-center tracking-wider">Dashboard</h1>
                    </div>                
                `;
                data.forEach(({ title, completed, userId, id }) => {
                    let isCompletedClass = completed ? 'text-green-400' : 'text-red-400';
                    let isCompletedState = completed ? 'Completed' : 'Incompleted';
                    document.querySelector('#app').innerHTML += `
                        <div class="max-w-175 max-h-100 w-5/6 h-1/3 bg-white shadow-md border-x-10 rounded-xl flex flex-col justify-center gap-2 px-5 py-5 relative border-x-[${
                            colors[userId - 1]
                        }] cursor-pointer transition-all duration-100 hover:scale-105">
                            <h1 class="font-bold text-xl capitalize">${title}</h1>
                            <p class="font-semibold text-gray-400">Status: <span class="${isCompletedClass}">${isCompletedState}</span></p>
                            <p class="absolute right-2 bottom-1 text-sm text-gray-400">#${id}</p>
                        </div>
                    `;
                });
            })
            .catch(() => {
                let app = document.querySelector('#app');
                app.classList.add('justify-center');
                app.classList.add('h-screen');
                app.innerHTML = `
                    <p class="text-black text-4xl">Error Parsing Data</p>
                `;
            });
    })
    .catch(() => {
        let app = document.querySelector('#app');
        app.classList.add('justify-center');
        app.classList.add('h-screen');
        app.innerHTML = `
            <p class="text-black text-4xl">Error Fetching Data</p>
        `;
    });
