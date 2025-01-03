let hardcodedRecipes = [
    {
        "Name": "Baked Mac and Cheese",
        "Ingredients": [
            { "name": "elbow pasta", "amount": "one 16 oz box" },
            { "name": "eggs", "amount": 2 },
            { "name": "milk", "amount": "1 cup" },
            { "name": "salt", "amount": "1 tsp" },
            { "name": "black pepper", "amount": "1 tsp" },
            { "name": "onion powder", "amount": "1 tsp" },
            { "name": "butter", "amount": "1 stick" },
            { "name": "mozzarella", "amount": "1 cup" },
            { "name": "sharp cheddar", "amount": "1 cup" },
            { "name": "colby jack", "amount": "1 cup" }
        ],
        "Steps": [
            "Preheat the oven to 400 degrees.",
            "Boil the pasta until al dente.",
            "Drain pasta and put it in a pan.",
            "In the pot, mix milk, cheese, eggs, and seasoning over low heat.",
            "Pour the mixture over the pasta and mix.",
            "Top with more shredded cheese.",
            "Place in the oven and bake for 45 minutes or until the top is golden brown."
        ],
        "Image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRbMofYn9b1fd5-RVyV_J6Us2ZahtDAh7PkY0VPw4CsIsuozfT7"
    },
    {
        "Name": "Fried Chicken",
        "Ingredients": [
            { "name": "chicken pieces", "amount": "2 pounds" },
            { "name": "all-purpose flour", "amount": "2 cups" },
            { "name": "paprika", "amount": "2 tablespoons" },
            { "name": "garlic powder", "amount": "1 tablespoon" },
            { "name": "onion powder", "amount": "1 tablespoon" },
            { "name": "cayenne pepper", "amount": "1 tablespoon" },
            { "name": "salt", "amount": "1 teaspoon" },
            { "name": "black pepper", "amount": "1 teaspoon" },
            { "name": "buttermilk", "amount": "1 cup" },
            { "name": "vegetable oil", "amount": "3 cups" }
        ],
        "Steps": [
            "Wash the chicken.",
            "Season the chicken.",
            "Coat the chicken in flour.",
            "Fry the chicken."
        ],
        "Image": "https://pressureluckcooking.com/wp-content/uploads/2020/03/Fried-Chicken-720x540.jpg"
    }
];

function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes = hardcodedRecipes.concat(recipes);
    recipes = recipes.filter(recipe => recipe !== null && recipe !== undefined);

    recipeList.innerHTML = '';
    for (let index = 0; index < recipes.length; index++) {
        const row = document.createElement('tr');
        const recipe = recipes[index];

        row.innerHTML = `
            <td>${recipe.Name}</td>
            <td><button class="recipe-button" id="button-${index}" onclick="toggleDetails(${index})">Show Details</button></td>
            <td>
                <button class="edit-button" onclick="editRecipe(${index})">Edit</button>
                <button class="delete-button" onclick="deleteRecipe(${index})">Delete</button>
            </td>
        `;

        const detailsRow = document.createElement('tr');
        detailsRow.classList.add('recipe-details');
        detailsRow.id = `recipe-details-${index}`;
        detailsRow.innerHTML = `
            <td colspan="3" class="recipe-text">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.Ingredients.map(ingredient => `<li>${ingredient.amount} of ${ingredient.name}</li>`).join('')}
                </ul>
                <h3>Steps:</h3>
                <ol>
                    ${recipe.Steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
                ${recipe.Image ? `<img src="${recipe.Image}" alt="${recipe.Name}">` : ''}
            </td>
        `;
        recipeList.appendChild(row);
        recipeList.appendChild(detailsRow);
    }
}

function toggleDetails(index) {
    const details = document.getElementById(`recipe-details-${index}`);
    const button = details.previousElementSibling.querySelector('.recipe-button');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'table-row';
        button.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        button.textContent = 'Show Details';
    }
}

function editRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeToEdit = recipes[index - 2];
    localStorage.setItem('recipeToEdit', JSON.stringify({ index: index, recipe: recipeToEdit }));
    window.location.href = 'form.html';
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let newIndex = index - 2;
    recipes.splice(newIndex, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    alert('Recipe deleted successfully!');
    loadRecipes();
}

document.addEventListener('DOMContentLoaded', loadRecipes);
