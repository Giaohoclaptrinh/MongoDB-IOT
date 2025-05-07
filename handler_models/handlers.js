class handlers {
  home(req, res) {
    res.render("home", { data: 323 });
  }
}
const handle = new handlers();
export default handle;
