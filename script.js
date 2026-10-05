const form = document.querySelector("#reservation-form");

if(form){
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const time = document.getElementById("time").value;
        const numberOfTimes = Number(document.getElementById("number-of-times").value);
        const date = document.getElementById("date").value; 

        const response = await fetch(
            "http://localhost:8787/api/reservations",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reservationDate: date,
                    reservationTime: time,
                    numberOfTimes: numberOfTimes,
                }),
            }
        )
        if(!response.ok){
            console.error("予約登録に失敗しました．");
            return;
        }
        const result = await response.json();

        const params = new URLSearchParams({
            id: String(result.id),
        });

        window.location.href = `reserve.html?${params.toString()}`;
    })
}

async function loadReservation(){
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if(!id) {
        console.error("予約がありません．");
        return;
    }
    const response = await fetch(
        `http://localhost:8787/api/reservations/${id}`,
    );

    if(!response.ok){
        console.error("予約情報の取得に失敗しました．");
        return;
    }
    const result = await response.json();

    document.querySelector("#reserved-number").textContent = result.reservation.id;
    document.querySelector("#reserved-date").textContent = result.reservation.reservation_date;
    document.querySelector("#reserved-time").textContent = result.reservation.reservation_time;
    document.querySelector("#visit-count").textContent = result.reservation.number_of_times;
}   

const reservedDate = document.querySelector("#reserved-date");

if(reservedDate){
    loadReservation();
}
