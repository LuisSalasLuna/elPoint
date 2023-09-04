<script>
    import { user_lat, user_lng } from './stores.js';

    export let point;
    let distance;

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function distanceToUser(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en kilómetros
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1000;
        return Math.round(distance);
    }

    $: if (point) {
        distance = distanceToUser($user_lat, $user_lng, point.latitude/1000000, point.longitude/1000000)
    }
</script>

<article>
    <div class="decorator" />
    {#if point}
        <div class="point">
            <img src={point.profilepic} 
            alt="Una pizza muy rica" width="96" height="96">
            <div class="text">
                <h3>{point.tags[0]} · {distance}m</h3>
                <h1>{point.name}</h1>
            </div>
        </div>
    {/if}
</article>

<style>
    .decorator {
        width: 50px;
        height: 4px;
        margin: auto;
        border-radius: 2px;
        background-color: #aaa;
    }
    article {
        position: absolute;
        z-index: 999;
        inset: auto 0 0 0;
        background-color: white;
        padding: 15px;
        border-radius: 24px 24px 0 0;
        box-shadow: var(--shadow);
    }
    .point {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    img {
        display: block;
        object-fit: cover;
        border-radius: 8px;
    }
    h3 {
        font-size: 12px;
        line-height: 12px;
    }
    h1 {
        font-size: 17px;
        line-height: 22px;
    }
</style>