document.addEventListener('DOMContentLoaded', function () {
    const availableJuicesElement = document.getElementById('available-Juices');
    const col2Container2Element = document.querySelector('.col-2-container2');
    const div1 = document.getElementById("pos-cen1");
    const div2 = document.getElementById("pos-cen2");
    const div3 = document.getElementById("pos-cen3");
    const div4 = document.getElementById("pos-cen4");
    const div5 = document.getElementById("pos-cen5");
    const orderButton = document.getElementById('order');
    const checkboxes = document.querySelectorAll('input[name="juiceCheckbox"]');
    const orderConfirmationDiv = document.createElement('div');
    orderConfirmationDiv.id = 'orderConfirmation';
    orderConfirmationDiv.style.color = 'green';
    orderConfirmationDiv.style.fontSize = '20px';
    orderConfirmationDiv.style.marginTop = '20px';
    document.querySelector('.col-1').appendChild(orderConfirmationDiv);



    // Fetch juices data from JSON server
    fetch('http://localhost:3000/juices')
        .then(response => response.json())
        .then(data => {
            // Create checkboxes and labels dynamically
            data.forEach(juice => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'juiceCheckbox';
                checkbox.value = juice.id;
                checkbox.style.marginRight = "10px";

                const label = document.createElement('label');
                label.textContent = juice.name;
                label.style.fontSize ="40px";
                label.style.fontFamily = "myFont0";
                label.style.color = "#702642"

                // Append checkbox and label to the container
                availableJuicesElement.appendChild(checkbox);
                availableJuicesElement.appendChild(label);
                availableJuicesElement.appendChild(document.createElement('br'));
            });

            // Add event listener to checkboxes
            const checkboxes = document.querySelectorAll('input[name="juiceCheckbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    updateSelectedJuices(data, checkboxes);
                });
            });
        })

    // Function to update selected juices
    function updateSelectedJuices(data, checkboxes) {
        const div1 = document.getElementById("pos-cen1");
        const div2 = document.getElementById("pos-cen2");
        const div3 = document.getElementById("pos-cen3");
        const div4 = document.getElementById("pos-cen4");
        const div5 = document.getElementById("pos-cen5");

        // Reset content
        div1.innerHTML = '';
        div2.innerHTML = '';
        div3.innerHTML = '';
        div4.innerHTML = '';
        div5.innerHTML = '';


        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const juice = data[index];

                const img = document.createElement('img');
                img.src = juice.image; // Replace with the actual image source
                img.alt = juice.name;

                const p = document.createElement('p');
                p.innerHTML = `<span>${juice.name} <br> $${juice.price.toFixed(2)}</span> `;
                p.style.color ="black"

                // Append the img and p elements to the corresponding div
                if (!div1.firstChild) {
                    div1.appendChild(img.cloneNode(true));
                    div1.appendChild(p.cloneNode(true));
                } else if (!div2.firstChild) {
                    div2.appendChild(img.cloneNode(true));
                    div2.appendChild(p.cloneNode(true));
                } else if (!div3.firstChild) {
                    div3.appendChild(img.cloneNode(true));
                    div3.appendChild(p.cloneNode(true));
                } else if (!div4.firstChild) {
                    div4.appendChild(img.cloneNode(true));
                    div4.appendChild(p.cloneNode(true));
                }else if (!div5.firstChild) {
                    div5.appendChild(img.cloneNode(true));
                    div5.appendChild(p.cloneNode(true));
                }
            }


            // Add event listener to "Order" button
            orderButton.addEventListener('click', function () {
                handleOrder(data, checkboxes);
            });
        });


    // Function to handle the "Order" button click
    function handleOrder(data, checkboxes) {
        const selectedJuices = [];
        let totalPrice = 0;

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const juice = data[index];
                selectedJuices.push(juice);
                totalPrice += juice.price;
            }
        });

        displayOrderConfirmation(selectedJuices, totalPrice);
    }

    // Function to display the order confirmation
    function displayOrderConfirmation(selectedJuices, totalPrice) {
        div5.innerHTML = '';

        if (selectedJuices.length > 0) {
            selectedJuices.forEach(juice => {
                const p = document.createElement('p');
                p.innerHTML = `<span>${juice.name} <br> $${juice.price.toFixed(2)}</span> `;
                p.style.fontFamily = "myFont1"
                div5.appendChild(p);
            });

            const totalP = document.createElement('p');
            totalP.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
            totalP.style.color = "#702642 ";
            totalP.style.fontSize = "20px"
            totalP.style.marginLeft = "20px"
            totalP.style.fontFamily = "myFont0";
            div5.appendChild(totalP);

            orderConfirmationDiv.innerHTML = `Your order has been received successfully. Pay the total cash: $${totalPrice.toFixed(2)}`;
            orderConfirmationDiv.style.fontSize = "30px";
            orderConfirmationDiv.style.fontFamily = "myFont1";
            orderConfirmationDiv.style.color = "green";
            orderConfirmationDiv.style.fontWeight= "900";
            orderConfirmationDiv.style.marginLeft = "20%"
                        // Reset order button label and clear selected juices
                        orderButton.innerHTML = '<a href="#">Add</a>';
        } else {
            orderConfirmationDiv.innerHTML = 'Please select at least one juice before placing an order.';
        }
    }
}
});









