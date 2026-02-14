
const fromStation = document.getElementById("fromStation");
const toStation = document.getElementById("toStation");
const currentTicket = document.getElementById("currentTicket");

function calculateTicketPrice() {
    let from = parseInt(fromStation.value);
    let to = parseInt(toStation.value);

    if (fromStation.value === "" || toStation.value === "") {
        currentTicket.value = "⚠️ يرجى اختيار محطتي الركوب والوصول";
        return;
    }
    if (
        (from === 0 && ((to >= 1 && to <= 8))) ||
        
        (from === 1 && ((to >= 2 && to <= 9)||to<1)) ||
        
        (from === 2 && ((to >= 3 && to <= 10)||to<2)) ||
        
        (from === 3 && ((to >= 4 && to <= 11)||to<3)) ||
        
        (from === 4 && ((to >= 5 && to <= 12)||to<4)) ||
        
        (from === 5 && ((to >= 6 && to <= 13)||to<5)) ||
        
        (from === 6 && ((to >= 7 && to <= 14)||to===41||to===42)) ||
        
        (from === 7 && (((to >= 8 && to <= 15)||(to>=40&&to<=43)||to===70))) ||
        
        (from === 8 && ((to >= 9 && to <= 16)||(to>=39&&to<=43)||(to>=69&&to<=71))) ||
        
        (from === 9 && ((to >= 10 && to <= 17)||(to>=38&&to<=44)||(to>=1&&to<=8))) ||
        
        (from === 10 && ((to >= 11 && to <= 18)||(to>=37&&to<=45)||(to>=67&&to<=73)||(to>=2&&to<=9))) ||
        
        (from === 11 && ((to >= 12 && to <= 19)||(to>=36&&to<=46)||(to>=3&&to<=10))) ||
        
        (from === 12 && ((to >= 13 && to <= 20)||(to>=35&&to<=47)||(to>=4&&to<=11))) ) {
            price = 8;
        }


    currentTicket.value = `${price} جنيه`;
}

// تحديث تلقائي
fromStation.addEventListener("change", calculateTicketPrice);
toStation.addEventListener("change", calculateTicketPrice);
