type ContentAreaProps = {
  breadcrumb: string
  selectedName: string | null
  menuCount: number
}

export function ContentArea({ breadcrumb, selectedName, menuCount }: ContentAreaProps) {
  return (
    <div className="content-area" data-testid="content-area">
      <p className="breadcrumb">{breadcrumb}</p>
      <h1>{selectedName ?? '메뉴 안내'}</h1>
      <p className="muted">선택한 메뉴의 작업 공간입니다.</p>

      <section className="content-card">
        <p className="eyebrow">현재 선택한 메뉴</p>
        <h2>{selectedName ?? '선택 없음'}</h2>
        <p className="accent-text">{breadcrumb}</p>
        <hr />
        <p className="muted">이 영역에 메뉴별 화면이 표시됩니다.</p>
      </section>

      <div className="info-grid">
        <article className="info-card info-card-top">
          <h3>상단 메뉴</h3>
          <p>전체 메뉴를 한눈에 보고 이동하세요.</p>
        </article>
        <article className="info-card info-card-left">
          <h3>좌측 메뉴</h3>
          <p>선택한 상단 그룹의 하위 메뉴만 표시됩니다.</p>
        </article>
      </div>
      <p className="menu-count">총 {menuCount}개의 하위 메뉴</p>
    </div>
  )
}
