$(document).ready(function () {
	// Logo
	var $logo = $("#logo");
	var $hellologo = $("#helloworld");
	if (location.href.indexOf("#") != -1) {
		if (location.href.substr(location.href.indexOf("#")) != "#about") {
			$logo.show();
		} else {
			$hellologo.show();
		}
	}

	// Show logo
	$("#tab-container .tab a").click(function () {
		$logo.slideDown("slow");
		$hellologo.slideUp("slow");
	});
	// Hide logo
	$("#tab-about").click(function () {
		$logo.slideUp("slow");
		$hellologo.slideDown("slow");
	});
	function animMeter() {
		$(".meter > span").each(function () {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate(
					{
						width: $(this).data("origWidth"),
					},
					1200
				);
		});
	}
	animMeter();

	$("#tab-container")
		.easytabs({
			animate: true,
			updateHash: true,
			transitionIn: "slideDown",
			transitionOut: "slideUp",
			animationSpeed: 400,
			tabActiveClass: "active",
		})
		.bind(
			"easytabs:midTransition",
			function (event, $clicked, $targetPanel) {
				if ($targetPanel.selector == "#resume") {
					animMeter();
				}
			}
		);

	fetch("https://api.github.com/users/Meharban-Singh/repos")
		.then(res => res.json())
		.then(data => {
			for (let project of data) {
				let container = document.createElement("a");
				container.setAttribute("href", project.html_url);
				container.setAttribute("target", "_blank");
				container.classList.add("project-card");

				let title = document.createElement("h1");
				title.textContent = project.name;
				container.append(title);

				if (project.description) {
					let desc = document.createElement("p");
					desc.textContent = project.description;
					container.append(desc);
				}

				if (project.language) {
					let languages = document.createElement("p");
					languages.classList.add("languages");
					languages.textContent = project.language;
					container.append(languages);
				}

				$("#portfolio .project-section").append(container);
			}
		});
});
