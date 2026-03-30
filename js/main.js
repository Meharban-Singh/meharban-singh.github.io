// Cool
console.clear();
console.log(
	"%cHOT DANGEROUS STUFF HERE!! AUTHORIZED PERSONNEL ONLY!",
	"font-size: 20px; border: 5px solid red; color: red; font-weight: 900; text-align: center; padding: 20px; background-color: white"
);

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
		.then(async data => {
			var MAX_DESCRIPTION_LENGTH = 100;

			data = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
			for (let project of data) {
				let container = document.createElement("div");
				container.classList.add("project-card");

				let infoContainer = document.createElement("div");
				infoContainer.classList.add("project-info");

				let title = document.createElement("h1");
				title.textContent = project.name;
				infoContainer.append(title);

				let desc = document.createElement("p");
				desc.classList.add("project-description");
				desc.textContent = getTrimmedDescription(project.description, MAX_DESCRIPTION_LENGTH);
				infoContainer.append(desc);

				let languages = document.createElement("p");
				languages.classList.add("languages");
				languages.textContent = project.language ? project.language : "Unknown";
				infoContainer.append(languages);
			

				container.appendChild(infoContainer);

				let buttons = document.createElement("div");
				buttons.classList.add("project-buttons");

				let projectLink = getProjectDemoLink(project);
				let demoLink = document.createElement("a");
				demoLink.classList.add("demo-link");
				demoLink.textContent = projectLink ? "Demo" : "No Demo";
				if (projectLink) {
					demoLink.setAttribute("href", projectLink);
					demoLink.setAttribute("target", "_blank");
				} else {
					demoLink.classList.add("is-disabled");
					demoLink.setAttribute("aria-disabled", "true");
				}
				buttons.append(demoLink);

				let codeLink = document.createElement("a");
				codeLink.classList.add("demo-link");
				codeLink.setAttribute("href", project.html_url);
				codeLink.setAttribute("target", "_blank");
				codeLink.textContent = "Code";
				buttons.append(codeLink);

				container.append(buttons);

				$("#portfolio .project-section").append(container);
			}
		});

		function getTrimmedDescription(description, maxLength) {
			if (!description) {
				return "No description provided.";
			}

			if (description.length <= maxLength) {
				return description;
			}

			return description.substring(0, maxLength - 3).trimEnd() + "...";
		}

		function getProjectDemoLink(project) {
			if (project.homepage) {
				return project.homepage;
			}

			if (project.has_pages) {
				return "./" + project.name;
			}
			
			return null;
		}
});
