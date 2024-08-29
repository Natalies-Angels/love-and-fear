document.addEventListener('DOMContentLoaded', function () {
    let currentSection = 0;
    const sections = document.querySelectorAll('.form-section');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });

        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === sections.length - 1 ? 'none' : 'inline-block';
    }

    prevBtn.addEventListener('click', function () {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    showSection(currentSection);
});
