import PenaGuru from "../../../../public/PenaGuru.png"
export default function Footer (){

    return (
        <>
        <footer class="footer p-10 bg-base-200 text-base-content ">
        <aside>
         {/* <img src={PenaGuru} alt="" width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"></img> */}
          <p>© 2024 PENAGURU. All rights reserved.</p>
        </aside>
        <nav>
          <h6 class="footer-title">SOCIAL</h6> 
          <a class="link link-hover" href="https://www.instagram.com/duivions/" target="_blank" >Instagram</a>
          <a class="link link-hover" target="_blank" href="#">Github</a>
        </nav> 
        <nav>
          <h6 class="footer-title">PUBLIKASI</h6> 
          <a class="link link-hover" href="#" target="_blank">Galeri</a>
        </nav> 
        <nav>
          <h6 class="footer-title">PUSAT LAYANAN</h6> 
          <a class="link link-hover" href="#" target="_blank">Contact us</a>

        </nav>
      </footer></>
    )
}