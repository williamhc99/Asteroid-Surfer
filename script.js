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

	targ.style.zIndex = MAXZ++;

	if (targ.className != "dragme") {
		return;
	}

	// calculate event X, Y coordinates
	offsetX = e.clientX;
	offsetY = e.clientY;

	var pos = targ.getBoundingClientRect();
	// console.log(rect.top, rect.right, rect.bottom, rect.left);

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
	return false;
}
function stopDrag() {
	drag = false;
}

MAXZ = 1;
window.onload = function () {
	document.onmousedown = startDrag;
	document.onmouseup = stopDrag;
};

$(document).ready(function () {
	setTimeout(function () {
		$("body").addClass("loaded");
		$("h1").css("color", "#222222");
	}, 500);
});
