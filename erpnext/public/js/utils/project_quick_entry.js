frappe.provide("frappe.ui.form");

frappe.ui.form.ProjectQuickEntryForm = class ProjectQuickEntryForm extends (
	frappe.ui.form.QuickEntryForm
) {
	render_dialog() {
		super.render_dialog();

		const project_name_field = this.dialog.get_field("project_name");

		console.log("Dialog", this.dialog);

		if (project_name_field) {
			var me = this;
			const abbr_field = this.dialog.get_field("abbr");
			project_name_field.$input.on("input", function(e) {
				// Generate abbreviation dynamically as user types
				const parts = project_name_field.get_value().split(/\s+/);
				let abbr = "";

				if (parts.length > 1) {
					// For multi-word names, take the first letter of each word
					abbr = parts
						.map(word => word ? word.charAt(0).toUpperCase() : "")
						.join("")
						.slice(0, 3); // Limit abbreviation to 3 characters
				} else {
					// Single word, use up to 3 characters
					abbr = parts[0].substring(0, 3).toUpperCase();
				}

				// Set the abbreviation to the custom field
				abbr_field.set_value(abbr);
			});
		}
	}
};
