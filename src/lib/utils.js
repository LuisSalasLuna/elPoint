export function formatear(hora24, s = false) {
    const partes = hora24.split(":");
    const hora = parseInt(partes[0], 10);
    const minutos = partes[1];

    if (hora === 0) {
        return `${s?'s ':''}12:${minutos} am`;
    } else if (hora < 12) {
		if (s) return `${hora==1?' ':'s '}${hora}:${minutos} am`;
        return `${hora}:${minutos} am`;
    } else if (hora === 12) {
        return `${s?'s ':''}12:${minutos} pm`;
    } else {
        if (s) return `${hora==13?' ':'s '}${hora - 12}:${minutos} pm`;
        return `${hora - 12}:${minutos} pm`;
    }
}

export function estadoLocal(horarios, tiempoActual) {
	const horas = tiempoActual.split(":").map(n => parseInt(n, 10)); // [11,30]
	const ahora = horas[0] * 60 + horas[1];  // Convertir a minutos     690 min
	for (let horario of horarios) {
		const [horaApertura, horaCierre] = horario.map(h => {
			const partes = h.split(":").map(n => parseInt(n, 10));
			return partes[0] * 60 + partes[1];  // Convertir a minutos
		}); // [300, 700]

		if (horaApertura <= ahora && ahora < horaCierre) {
			const minutosRestantes = horaCierre - ahora;
			if (minutosRestantes <= 45) {  // Suponiendo que "por cerrar" es 45 minutos antes de cerrar
				return `Por cerrar a la${formatear(horario[1], true)}`;
			}
			return `Abierto hasta la${formatear(horario[1], true)}`;
		} else if (horaApertura > horaCierre && (ahora < horaCierre || ahora >= horaApertura)) {
			return `Abierto hasta la${formatear(horario[1], true)}`;
		}
	}

	// Encuentra el siguiente horario de apertura
	let proximoHorario = horarios[0];
	for (let horario of horarios) {
		const [horaApertura, _] = horario.map(h => {
			const partes = h.split(":").map(n => parseInt(n, 10));
			return partes[0] * 60 + partes[1];  // Convertir a minutos
		});

		if (horaApertura > ahora) {
			proximoHorario = horario;
			break;
		}
	}

	return `Cerrado. Abre a la${formatear(proximoHorario[0], true)}`;
}

export function distancia(from, to) {
    const R = 6371e3; // Radio medio de la Tierra en metros
    const rad = (grados) => grados * Math.PI / 180;

	const lat1 = from[0], lon1 = from[1]
	const lat2 = to[0], lon2 = to[1]

    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;

	if (distancia > 1000) {
		return (distancia / 1000).toFixed(1) + ' km';
	}

    return Math.round(distancia) + ' m'; // Distancia en metros
}