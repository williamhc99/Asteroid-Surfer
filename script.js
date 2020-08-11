function withinUFOScanner(targ) {
	let rect1 = ufo.getBoundingClientRect();
	let rect2 = targ.getBoundingClientRect();
	let overlap = !(
		rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom
	);
	return overlap;
}

function startDrag(e) {
	// determine event object
	if (!e) {
		var e = window.event;
	}
	if (e.preventDefault) e.preventDefault();

	// IE uses srcElement, others use target
	targ = e.target ? e.target : e.srcElement;

	if (targ.tagName.toLowerCase() === "img") {
		targ = targ.parentElement;
	}

	console.log(targ);

	if (targ.id != "ufo") {
		targ.style.zIndex = MAXZ++;
	}

	if (!targ.className.includes("dragme")) {
		return;
	}

	// calculate event X, Y coordinates
	offsetX = e.clientX;
	offsetY = e.clientY;

	var pos = targ.getBoundingClientRect();

	// assign default values for top and left properties
	if (!targ.style.left) {
		targ.style.left = pos.left.toString() + "px";
	}
	if (!targ.style.top) {
		targ.style.top = pos.top.toString() + "px";
	}

	// calculate integer values for top and left
	// properties
	coordX = parseInt(targ.style.left);
	coordY = parseInt(targ.style.top);
	drag = true;

	// move div element
	document.onmousemove = dragDiv;
	return false;
}

function dragDiv(e) {
	if (!drag) {
		return;
	}
	if (!e) {
		var e = window.event;
	}
	// move div element
	targ.style.left = coordX + e.clientX - offsetX + "px";
	targ.style.top = coordY + e.clientY - offsetY + "px";

	if (targ.id != "ufo") {
		let desc = document.getElementById(targ.id.concat("-desc"));
		if (withinUFOScanner(targ)) {
			desc.style.visibility = "visible";
			tri.style.visibility = "visible";
			console.log("OVERLAP BABYYY");
		} else {
			desc.style.visibility = "hidden";
			tri.style.visibility = "hidden";
		}
	}

	return false;
}

function stopDrag() {
	drag = false;
}

function initalizeItems() {
	surfer = document.getElementById("surfer");
	surfer.style.left = "1000px";
	surfer.style.top = "350px";

	// feelfree = document.getElementById("feelfree");
	// feelfree.style.left = "350px";
	// feelfree.style.top = "100px";
}

$(document).ready(function () {
	setTimeout(function () {
		$("body").addClass("loaded");
		$("h1").css("color", "#222222");
	}, 500);
});

initalizeItems();

MAXZ = 1;
var ufo = document.getElementById("ufo");
var tri = document.getElementById("tri");

window.onload = function () {
	document.onmousedown = startDrag;
	document.onmouseup = stopDrag;
	document.ontouchstart = startDrag;
	document.ontouchend = stopDrag;
};
