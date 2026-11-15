/**
 * ==========================================================================
 * [작품 목록 데이터 (Works Data)]
 * ==========================================================================
 * 새로운 과제나 작품을 추가하고 싶을 때는 아래 works 배열에 객체를 추가하세요.
 * 
 * [객체 속성 안내]
 * - id: 고유 식별 번호 (숫자)
 * - title: 작품 제목
 * - category: 'image' (이미지) | 'video' (영상) | 'audio' (오디오)
 * - file: assets 폴더 내 파일 경로 (예: 'assets/파일명.png')
 * - description: 작품 설명
 * - tags: 관련된 해시태그 목록 (배열)
 * ==========================================================================
 */
const works = [
  {
    id: 1,
    title: "사회복지과 홍보 포스터",
    category: "image",
    file: "assets/06_image_1.png",
    description: "혜전대학교 사회복지과의 교육 목표와 비전, 따뜻한 나눔의 가치를 널리 알리기 위해 제작한 공식 학과 홍보 포스터입니다.",
    tags: ["사회복지과", "학과홍보", "포스터디자인"]
  },
  {
    id: 2,
    title: "장애인 인식 개선 카드뉴스 (점자블록, 주차구역 준수 등)",
    category: "image",
    file: "assets/06_image_2.png",
    description: "장애인 전용 주차구역 준수와 시각장애인을 위한 점자블록 보호 등 일상 속 장애인 이동권 보장과 실천을 촉구하는 인식 개선 카드뉴스입니다.",
    tags: ["장애인인식개선", "카드뉴스", "이동권보장"]
  },
  {
    id: 3,
    title: "마음건강 3단 리플렛 (앞면)",
    category: "image",
    file: "assets/07_image_1.png",
    description: "청년과 지역 주민의 일상 스트레스 완화 및 정신건강 증진을 돕는 '마음건강 3단 리플렛' 표지 및 외면 디자인입니다.",
    tags: ["마음건강", "3단리플렛", "정신건강"]
  },
  {
    id: 4,
    title: "마음건강 3단 리플렛 (내지)",
    category: "image",
    file: "assets/07_image_2.png",
    description: "마음 상태 자가진단 항목과 전문 심리 상담 기관 연락처, 힐링 프로그램 안내를 체계적으로 담은 3단 리플렛 상세 내지 디자인입니다.",
    tags: ["마음건강", "3단리플렛", "복지정보"]
  },
  {
    id: 5,
    title: "사회복지 홍보영상 (09_video)",
    category: "video",
    file: "assets/09_video.mp4",
    description: "따뜻한 복지 실천의 현장과 이웃과의 소통을 생생하게 담은 9주차 사회복지 홍보영상 작품입니다.",
    tags: ["홍보영상", "사회복지실천", "영상콘텐츠"]
  },
  {
    id: 6,
    title: "사회복지 미디어 영상 (10_video)",
    category: "video",
    file: "assets/10_video.mp4",
    description: "사회복지 전공 지식과 실천 메시지를 감각적인 시각 연출로 전달하는 10주차 영상 미디어 과제 작품입니다.",
    tags: ["미디어영상", "전공콘텐츠", "사회복지과"]
  }
];

/* ==========================================================================
   DOM 요소 참조 및 초기 상태 설정
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const worksGrid = document.getElementById("worksGrid");
  const emptyNotice = document.getElementById("emptyNotice");
  const filterBtns = document.querySelectorAll(".filter-btn");
  
  // 카운트 뱃지 요소
  const countAll = document.getElementById("count-all");
  const countImage = document.getElementById("count-image");
  const countVideo = document.getElementById("count-video");
  const countAudio = document.getElementById("count-audio");

  // 모달 관련 요소
  const mediaModal = document.getElementById("mediaModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalMediaWrap = document.getElementById("modalMediaWrap");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");

  // 테마 토글 버튼 요소
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeLabel = themeToggleBtn.querySelector(".theme-label");

  let currentFilter = "all";

  /* ==========================================================================
     1. 다크모드 / 라이트모드 관리 (밝게 / 어둡게)
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem("portfolio_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeLabel.textContent = "밝게";
      localStorage.setItem("portfolio_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeLabel.textContent = "어둡게";
      localStorage.setItem("portfolio_theme", "light");
    }
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
  });

  /* ==========================================================================
     2. 카테고리별 개수 카운트 업데이트
     ========================================================================== */
  function updateCounts() {
    const totalCount = works.length;
    const imageCount = works.filter(item => item.category === "image").length;
    const videoCount = works.filter(item => item.category === "video").length;
    const audioCount = works.filter(item => item.category === "audio").length;

    countAll.textContent = totalCount;
    countImage.textContent = imageCount;
    countVideo.textContent = videoCount;
    countAudio.textContent = audioCount;
  }

  /* ==========================================================================
     3. 작품 카드 렌더링
     ========================================================================== */
  function renderWorks(filter) {
    worksGrid.innerHTML = "";
    
    const filteredWorks = filter === "all" 
      ? works 
      : works.filter(item => item.category === filter);

    if (filteredWorks.length === 0) {
      emptyNotice.style.display = "block";
      return;
    } else {
      emptyNotice.style.display = "none";
    }

    filteredWorks.forEach(work => {
      const card = document.createElement("article");
      card.className = "work-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${work.title} 클릭하여 열기`);

      let badgeLabel = "이미지";
      let badgeClass = "badge-image";
      let actionHint = "크게 보기 ↗";
      let mediaHtml = "";

      if (work.category === "image") {
        badgeLabel = "🖼️ 이미지";
        badgeClass = "badge-image";
        actionHint = "크게 보기 ↗";
        mediaHtml = `
          <div class="card-media-wrap">
            <span class="media-badge ${badgeClass}">${badgeLabel}</span>
            <img class="card-img" src="${work.file}" alt="${work.title}" loading="lazy">
          </div>
        `;
      } else if (work.category === "video") {
        badgeLabel = "🎬 영상";
        badgeClass = "badge-video";
        actionHint = "영상 재생 ▶";
        mediaHtml = `
          <div class="card-media-wrap video-card-wrap">
            <span class="media-badge ${badgeClass}">${badgeLabel}</span>
            <div class="video-preview-bg">
              <video class="card-video" preload="metadata" muted playsinline>
                <source src="${work.file}" type="video/mp4">
              </video>
              <div class="video-play-overlay">
                <div class="play-circle" title="영상 재생">▶</div>
                <span class="video-guide-text">영상 보러가기</span>
              </div>
            </div>
          </div>
        `;
      } else if (work.category === "audio") {
        badgeLabel = "🎧 오디오";
        badgeClass = "badge-audio";
        actionHint = "듣기 ▶";
        mediaHtml = `
          <div class="card-media-wrap">
            <span class="media-badge ${badgeClass}">${badgeLabel}</span>
            <div class="audio-card-visual">
              <span class="audio-icon-large">🎙️</span>
              <div class="play-circle">▶</div>
            </div>
          </div>
        `;
      }

      const tagsHtml = work.tags.map(t => `<span class="card-tag">#${t}</span>`).join("");

      card.innerHTML = `
        ${mediaHtml}
        <div class="card-content">
          <h2 class="card-title">${work.title}</h2>
          <p class="card-desc">${work.description}</p>
          <div class="card-footer">
            <div class="card-tags">
              ${tagsHtml}
            </div>
            <span class="card-action-hint">${actionHint}</span>
          </div>
        </div>
      `;

      // 카드 클릭 및 키보드 엔터 이벤트로 모달 열기
      const openModalHandler = () => openModal(work);
      card.addEventListener("click", openModalHandler);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModalHandler();
        }
      });

      worksGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     4. 필터 탭 클릭 이벤트
     ========================================================================== */
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      currentFilter = btn.getAttribute("data-filter");
      renderWorks(currentFilter);
    });
  });

  /* ==========================================================================
     5. 라이트박스 모달 제어 (크게 보기 & 미디어 재생)
     ========================================================================== */
  function openModal(work) {
    // 이전 모달 미디어 비우기
    modalMediaWrap.innerHTML = "";

    if (work.category === "image") {
      const img = document.createElement("img");
      img.src = work.file;
      img.alt = work.title;
      modalMediaWrap.appendChild(img);
      modalCategory.textContent = "🖼️ 시각 이미지 디자인";
    } else if (work.category === "video") {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "auto";
      video.style.width = "100%";
      video.style.maxHeight = "60vh";
      video.style.backgroundColor = "#000000";

      const source = document.createElement("source");
      source.src = work.file;
      source.type = "video/mp4";
      video.appendChild(source);

      modalMediaWrap.appendChild(video);
      modalCategory.textContent = "🎬 영상 미디어 콘텐츠";

      // 비디오 준비 및 자동 재생 시도
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("브라우저 자동 재생 제한으로 수동 재생 대기 중입니다:", err);
        });
      }
    } else if (work.category === "audio") {
      const audioWrap = document.createElement("div");
      audioWrap.className = "modal-audio-wrap";
      audioWrap.innerHTML = `
        <div style="font-size: 3.5rem;">🎙️</div>
        <p style="font-weight: 600; color: var(--text-main);">오디오 플레이어</p>
        <audio controls autoplay src="${work.file}"></audio>
      `;
      modalMediaWrap.appendChild(audioWrap);
      modalCategory.textContent = "🎧 오디오 미디어 팟캐스트";
    }

    // 상세 정보 반영
    modalTitle.textContent = work.title;
    modalDesc.textContent = work.description;
    modalTags.innerHTML = work.tags.map(t => `<span class="modal-tag">#${t}</span>`).join("");

    // 모달 표시 및 스크롤 고정
    mediaModal.classList.add("open");
    mediaModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    // 재생 중인 미디어 정지 및 정리
    const activeVideo = modalMediaWrap.querySelector("video");
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.currentTime = 0;
      activeVideo.src = "";
      activeVideo.load();
    }
    const activeAudio = modalMediaWrap.querySelector("audio");
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.src = "";
    }

    mediaModal.classList.remove("open");
    mediaModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalMediaWrap.innerHTML = "";
  }

  // 모달 닫기 버튼
  modalCloseBtn.addEventListener("click", closeModal);

  // 모달 배경 클릭 시 닫기
  mediaModal.addEventListener("click", (e) => {
    if (e.target === mediaModal) {
      closeModal();
    }
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mediaModal.classList.contains("open")) {
      closeModal();
    }
  });

  /* ==========================================================================
     초기 실행 & 해시 링크 지원
     ========================================================================== */
  initTheme();
  updateCounts();
  renderWorks(currentFilter);

  // URL 해시 지원 (예: #video로 접속 시 영상 탭 활성화, #modal=5 로 접속 시 모달 즉시 오픈)
  function handleHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash === "image" || hash === "video" || hash === "audio") {
      const targetBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
      if (targetBtn) targetBtn.click();
    } else if (hash.startsWith("modal=")) {
      const workId = parseInt(hash.replace("modal=", ""), 10);
      const targetWork = works.find(w => w.id === workId);
      if (targetWork) openModal(targetWork);
    }
  }
  handleHash();
  window.addEventListener("hashchange", handleHash);
});
