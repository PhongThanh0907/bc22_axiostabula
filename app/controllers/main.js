var services = new Services();

var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var member = data[i];
    if (`${member.loaiND}` === "GV") {
      content += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${member.taiKhoan}</td>
                  <td>${member.matKhau}</td>
                  <td>${member.hoTen}</td>
                  <td>${member.email}</td>
                  <td>${member.ngonNgu}</td>
                  <td>${member.loaiND}</td>
                  <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${
                        member.id
                      })">Sửa</button>
                      <button class="btn btn-danger" onclick="xoa(${
                        member.id
                      })">X</button>
                  </td>
              </tr>
          `;
    }
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
  }
}

function getListMember() {
  services
    .fetchData()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListMember();

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Member";
  var footer = `<button class="btn btn-success" onclick="addMember()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function xoa(id) {
  services
    .deleteMember(id)
    .then(function () {
      getListMember();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function sua(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Member";
  var footer = `<button class="btn btn-warning" onclick="capNhat(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  services
    .getMemberApi(id)
    .then(function (result) {
      var member = result.data;
      getEle("TaiKhoan").value = member.taiKhoan;
      getEle("HoTen").value = member.hoTen;
      getEle("MatKhau").value = member.matKhau;
      getEle("Email").value = member.email;
      getEle("HinhAnh").value = member.hinhAnh;
      getEle("loaiNguoiDung").value = member.loaiND;
      getEle("loaiNgonNgu").value = member.loaiNgonNgu;
      getEle("MoTa").value = member.moTa;
    })
    .catch(function () {});
}

function capNhat(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var member = new Member(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );

  services
    .updateMember(member)
    .then(function () {
      getListMember();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addMember() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;
  //Kiểm tra tài khoản
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "divErrorTaiKhoan",
      "(*)Tài khoản không được trống"
    ) &&
    validation.kiemTraChuoiKyTu(
      taiKhoan,
      "divErrorTaiKhoan",
      "(*) Vui lòng nhập chữ"
    );
  //Kiểm tra Họ và tên
  isValid &=
    validation.kiemTraRong(
      hoTen,
      "divErrorHoTen",
      "(*)Họ và tên không được trống"
    ) &&
    validation.kiemTraChuoiKyTu(
      hoTen,
      "divErrorHoTen",
      "(*) Vui lòng nhập chữ"
    );
  //Kiểm tra Mật Khẩu
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "divErrorMatKhau",
      "(*) Mật khẩu không được trống"
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "divErrorMatKhau",
      "(*) Mật khẩu 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "divErrorMatKhau",
      "(*)Mật khẩu có độ dài 6-8 ký tự",
      6,
      8
    );
  //Kiểm tra email
  isValid &=
    validation.kiemTraRong(
      email,
      "divErrorEmail",
      "(*) Email không được trống"
    ) &&
    validation.kiemTraEmail(
      email,
      "divErrorEmail",
      "(*) Email không đúng định dạng"
    );
  //Kiểm tra Hình ảnh
  isValid ==
    validation.kiemTraRong(
      hinhAnh,
      "divErrorHinhAnh",
      "(*) Hình ảnh không được trống"
    );
  //Kiểm tra loại người dùng
  isValid ==
    validation.kiemTraNguoiDung(
      loaiNguoiDung,
      "divErrorNguoiDung",
      "(*) Người dùng không được trống"
    );
  //Kiêm tra ngôn ngữ
  isValid ==
    validation.kiemTraNgonNgu(
      loaiNgonNgu,
      "divErrorNgonNgu",
      "(*) Ngôn ngữ không được trống"
    );
  //Kiểm tra mô tả
  isValid &=
    validation.kiemTraRong(
      moTa,
      "divErrorMoTa",
      "(*) Mô tả không được trống"
    ) &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "divErrorMoTa",
      "(*) Mô tả không vượt quá 60 ký tự",
      1,
      60
    );

  if (!isValid) return null;

  var memBer = new Member(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );
  services
    .addMemberApi(memBer)
    .then(function () {
      getListMember();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
