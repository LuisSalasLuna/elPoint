<script>
    import Bottom from "./Bottom.svelte";
    import Point from "./Point.svelte";
    import Info from "./Info.svelte"
    import Map from "./Map.svelte"
    import MapMarker from "./MapMarker.svelte";

    let width, show = false

    let point = {
        "id": "12756238562387",
        "category": "Supermercado",
        "name": "El Super",
        "latitude": -16.3990652146552,
        "longitude": -71.5363676644025,
        "stars": 1,
        "media": "https://www.cencosud.com/cencosud/site/artic/20220310/imag/foto_0000002620220310141152/Jumbo_saludable_1.jpg",
        "location": "Portal de la Municipalidad 113, Plaza de Armas",
        
        // datos opcionales

        "schedule": [
            ["07:00", "12:50"],   // SON LOS HORARIOS DEL DÍA
            ["15:00", "18:00"]
        ],
        "details": "Hoy PROMO!!! Dos salchipapas familiares a tan solo S/36.00.",
        "phone": "940 - 185 - 837",
        "instagram": "la_donna",
        "payment": "efectivo y Yape",
        "wc": true,
        "tags": ["supermercado", "licores", "compras"]
    }
</script>


<svelte:head>
    <title>elPoint</title>
</svelte:head>

<Map lat={-16.398815198616617} lng={-71.53697356911059} zoom={14} on:click={(e) => {
    point = e.detail.point
    show = true
}}>
    <MapMarker lat={-16.39881} lon={-71.5369} />
</Map>


<Bottom {width} bind:show={show}>
    <Point {...point} bind:width={width}/>
    <Info  {point}/>
</Bottom>