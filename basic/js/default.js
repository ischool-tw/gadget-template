$(function() {
	
	$("#get-school-info").click(function(e) {
		e.preventDefault();
		
		$("#get-school-info").button("loading");
		
		// 呼叫 DSA 服務
		// 詳細 API 請查閱 https://sites.google.com/a/ischool.com.tw/ischool-web-kai-fa-zhe-wang-zhan/
		
		gadget.getContract("ta").send({
			service: "TeacherAccess.GetSchoolInformation",
			body: "",
			result: function(response, error, xhr) {
				
				if (error) {
					$("#gadget").append(
						"<div class='alert alert-error'>\
						  <button class='close' data-dismiss='alert'>×</button>\
						  <strong>呼叫服務失敗或網路異常，請稍候重試!</strong>\
						</div>");
				} else {
					$("#chinese-name").html(response.GetSchoolInformationResponse.SchoolInformation.ChineseName);
					$("#english-name").html(response.GetSchoolInformationResponse.SchoolInformation.EnglishName);
					$("#address").html(response.GetSchoolInformationResponse.SchoolInformation.Address);
					$("#telephone").html(response.GetSchoolInformationResponse.SchoolInformation.Telephone);
					$("#fax").html(response.GetSchoolInformationResponse.SchoolInformation.Fax);
				}
				
				$("#get-school-info").button("reset");
			}
		});
	});
	
	$("#get-school-logo").click(function(e) {
		e.preventDefault();
		
		$("#get-school-logo").button("loading");
		
		gadget.getContract("ta").send({
			service: "TeacherAccess.GetSchoolLogo",
			body: "",
			result: function(response, error, xhr) {
				
				if (error) {
					$("#gadget").append(
						"<div class='alert alert-error'>\
						  <button class='close' data-dismiss='alert'>×</button>\
						  <strong>呼叫服務失敗或網路異常，請稍候重試!</strong>\
						</div>");
				} else
					$("#school-logo").append("<img src='data:image/png;base64," + response.Response.Content + "'>");
				
				$("#get-school-logo").button("reset");
			}
		});
	});
	
	$("#get-my-courses").click(function(e) {
		e.preventDefault();
		
		$("#get-my-courses").button("loading");
		
		gadget.getContract("ta").send({
			service: "TeacherAccess.GetMyCourses",
			body: "<Request><Field><All/></Field></Request>",
			result: function(response, error, xhr) {
				
				if (error) {
					$("#gadget").append(
						"<div class='alert alert-error'>\
						  <button class='close' data-dismiss='alert'>×</button>\
						  <strong>呼叫服務失敗或網路異常，請稍候重試!</strong>\
						</div>");
				} else {
					$("#course-list tbody").html("");
					
					$(response.Courses.Course).each(function() {
						$("#course-list tbody").append("\
							<tr>\
								<td>" + this.SchoolYear + "</td>\
								<td>" + this.Semester + "</td>\
								<td>" + this.CourseName + "</td>\
								<td>" + this.Credit + "</td>\
							</tr>\
						");
					});
				}
				
				$("#get-my-courses").button("reset");
			}
		});
	});
})