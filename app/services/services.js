function Services() {
  this.fetchData = function () {
    return axios({
      url: "https://6268df2df2c0cdabac05797f.mockapi.io/api/member",
      method: "GET",
    });
  };
  this.deleteMember = function (id) {
    return axios({
      url: `https://6268df2df2c0cdabac05797f.mockapi.io/api/member/${id}`,
      method: "DELETE",
    });
  };
  this.addMemberApi = function (member) {
    return axios({
      url: "https://6268df2df2c0cdabac05797f.mockapi.io/api/member",
      method: "POST",
      data: member,
    });
  };
  this.getMemberApi = function (id) {
    return axios({
      url: `https://6268df2df2c0cdabac05797f.mockapi.io/api/member/${id}`,
      method: "GET",
    });
  };
  this.updateMember = function (member) {
    return axios({
      url: `https://6268df2df2c0cdabac05797f.mockapi.io/api/member/${member.id}`,
      method: "PUT",
      data: member,
    });
  };
}
