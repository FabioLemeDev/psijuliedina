/**
* Template Name: Logis
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*
* Adaptado para Psicologa Juliedina
*/
document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    /**
     * Função auxiliar para selecionar elementos
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Função auxiliar para adicionar event listener
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Função auxiliar para evento de scroll
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Sticky header on scroll
     */
    const selectHeader = select('#header')
    if (selectHeader) {
      let headerOffset = selectHeader.offsetTop
      let nextElement = selectHeader.nextElementSibling // Para calcular offset corretamente se não fixo no topo
  
      const headerFixed = () => {
         // Modificado para verificar scrollY > 50 (ou outra altura)
        if (window.scrollY > 50) {
          selectHeader.classList.add('scrolled')
        } else {
          selectHeader.classList.remove('scrolled')
        }
      }
      window.addEventListener('load', headerFixed)
      onscroll(document, headerFixed)
    }
  
     /**
     * Mobile nav toggle
     */
    const mobileNavShow = select('.mobile-nav-show');
    const mobileNavHide = select('.mobile-nav-hide');
    const body = select('body');
    const navbar = select('#navbar'); // Seleciona a navbar
  
    on('click', '.mobile-nav-toggle', function(e) {
      body.classList.toggle('mobile-nav-active');
      mobileNavShow.classList.toggle('d-none');
      mobileNavHide.classList.toggle('d-none');
      navbar.classList.toggle('navbar-mobile'); // Adiciona/remove classe para mostrar/esconder menu
    })
  
    /**
     * Esconde menu mobile ao clicar em um link
     */
     on('click', '#navbar a', function(e) {
       // Verifica se o menu mobile está ativo antes de tentar esconder
       if (body.classList.contains('mobile-nav-active')) {
           // Não previne default se for link externo ou âncora normal
           if (this.hash) { // Só executa para links internos com #
              body.classList.remove('mobile-nav-active');
              mobileNavShow.classList.remove('d-none');
              mobileNavHide.classList.add('d-none');
              navbar.classList.remove('navbar-mobile');
           }
       }
     }, true); // Usa 'true' para capturar todos os links dentro da navbar
  
  
    /**
     * Scroll top button
     */
    const scrollTop = select('.scroll-top')
    if (scrollTop) {
      const togglescrollTop = function() {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active')
      }
      window.addEventListener('load', togglescrollTop)
      onscroll(document, togglescrollTop)
      on('click', '.scroll-top', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link #
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
     /**
      * Ativa link da Navbar baseado na seção visível (Scrollspy)
      * Adaptação simples, Bootstrap Scrollspy pode ser mais robusto
      */
     const navbarlinks = select('#navbar .scrollto', true);
     const navbarlinksActive = () => {
         let position = window.scrollY + 200; // Offset para ativar um pouco antes
         navbarlinks.forEach(navbarlink => {
             if (!navbarlink.hash) return;
             let section = select(navbarlink.hash);
             if (!section) return;
             if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                 navbarlink.classList.add('active');
             } else {
                 navbarlink.classList.remove('active');
             }
         });
     };
     window.addEventListener('load', navbarlinksActive);
     onscroll(document, navbarlinksActive);
  
     // Adiciona a classe 'scrollto' aos links da navbar para o script acima funcionar
     document.querySelectorAll('#navbar a[href^="#"]').forEach(link => {
         link.classList.add('scrollto');
     });
  
  
    /**
     * Animação ao Scroll (AOS) Initialization (se adicionou a biblioteca)
     * Descomente as linhas abaixo se incluir a biblioteca AOS no HTML
     */
    // function aos_init() {
    //   AOS.init({
    //     duration: 800, // Duração da animação
    //     easing: 'ease-in-out', // Tipo de easing
    //     once: true, // Animar apenas uma vez
    //     mirror: false // Se anima ao rolar para cima também
    //   });
    // }
    // window.addEventListener('load', () => {
    //   aos_init();
    // });
  
  });