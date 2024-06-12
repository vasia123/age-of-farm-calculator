<template>
    <div class="projects-links">
        <a href="https://vasia123.github.io/farm-world-space-calculator/" class="project-link">
            <img src="/projects/farm-world.png" alt="Farm World">
        </a>
        <a href="https://vasia123.github.io/age-of-farm-calculator/" class="project-link project-link--active">
            <img src="/projects/age-of-farm.png" alt="Age of Farm">
            <!-- <span class="project-hint">new</span> -->
        </a>
    </div>
</template>
<style scoped>
.projects-links {
    display: flex;
    align-items: center;
    justify-content: center;
}

.project-link {
    margin: -5px 5px 15px;
    padding: 5px;
    border-radius: 50%;
    position: relative;
}

.project-link--active {
    background-color: hsla(217, 100%, 61%, 1);
}

.project-link img {
    width: 40px;
}

.project-hint {
    position: absolute;
    right: -3px;
    top: 4px;
    background-color: red;
    color: #fff;
    font-size: 7px;
    padding: 0 2px;
    border-radius: 2px;
}
</style>