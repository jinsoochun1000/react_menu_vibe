import React, { useState } from 'react';
import type { MenuItem, SubMenuItem } from '../../types/menu';
import { 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Database,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldCheck
} from 'lucide-react';
import './ContentArea.css';

interface ContentAreaProps {
  currentMenu?: MenuItem;
  currentSubMenu?: SubMenuItem;
  allMenus: MenuItem[];
  onSelectMenu: (menuId: string, subMenuId?: string) => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  currentMenu,
  currentSubMenu,
  allMenus,
  onSelectMenu,
}) => {
  const [showJson, setShowJson] = useState(false);

  if (!currentMenu || !currentSubMenu) {
    return (
      <main className="content-container">
        <div className="content-placeholder">
          <h2>메뉴를 선택해 주세요</h2>
          <p>상단 메뉴 또는 좌측 메뉴에서 원하는 항목을 클릭하세요.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="content-container">
      {/* 상단 Breadcrumb & 페이지 헤더 */}
      <div className="page-header">
        <div className="breadcrumb-nav">
          <span className="breadcrumb-root">홈</span>
          <ChevronRight size={14} className="breadcrumb-divider" />
          <span className="breadcrumb-parent">{currentMenu.name}</span>
          <ChevronRight size={14} className="breadcrumb-divider" />
          <span className="breadcrumb-current">{currentSubMenu.name}</span>
        </div>

        <div className="page-title-row">
          <div>
            <h1 className="page-title">{currentSubMenu.name} 화면</h1>
            <p className="page-subtitle">
              [{currentMenu.name}] 소속의 상세 업무 기능인 [{currentSubMenu.name}] 영역입니다.
            </p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className={`json-toggle-btn ${showJson ? 'active' : ''}`}
              onClick={() => setShowJson((prev) => !prev)}
            >
              <Code2 size={16} />
              <span>{showJson ? 'DB 스키마 숨기기' : 'DB 스키마 JSON 보기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* JSON 데이터 뷰어 (DB 연동 확인용) */}
      {showJson && (
        <div className="json-viewer-card">
          <div className="json-viewer-header">
            <div className="json-badge">
              <Database size={15} />
              <span>DB 메뉴 엔티티 모델 (현재 선택 메뉴)</span>
            </div>
            <span className="json-tip">차후 DB API 연동 시 동일한 JSON 구조로 전달됩니다.</span>
          </div>
          <pre className="json-code">
            {JSON.stringify({ currentMenu, currentSubMenu }, null, 2)}
          </pre>
        </div>
      )}

      {/* 대시보드 상태 요약 카드 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Activity size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-label">선택된 상단 1차 메뉴</span>
            <span className="stat-value">{currentMenu.name}</span>
            <span className="stat-desc">총 {currentMenu.subMenus.length}개 서브메뉴 보유</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-label">활성화된 좌측 2차 메뉴</span>
            <span className="stat-value">{currentSubMenu.name}</span>
            <span className="stat-desc">고유 식별자: {currentSubMenu.id}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <TrendingUp size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-label">시스템 상태</span>
            <span className="stat-value">정상 운영중</span>
            <span className="stat-desc">FullDown Menu 연동 완료</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper amber">
            <ShieldCheck size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-label">DB 연동 아키텍처</span>
            <span className="stat-value">Ready</span>
            <span className="stat-desc">MenuService 분리 구조</span>
          </div>
        </div>
      </div>

      {/* 메인 업무 콘텐츠 카드 */}
      <div className="detail-card">
        <div className="detail-card-header">
          <div className="detail-card-title">
            <Sparkles size={18} className="sparkle-icon" />
            <h3>기능 요구사항 검증 및 다른 메뉴 이동</h3>
          </div>
          <span className="badge-requirement">연동 검증 완료</span>
        </div>

        <div className="detail-card-body">
          <div className="feature-checklist">
            <div className="check-item">
              <CheckCircle2 size={18} className="check-icon" />
              <div>
                <strong>상단 메뉴 (GNB)</strong>
                <p>메뉴 1 ~ 5 상단 노출 및 호버 시 전체 서브메뉴 풀다운(FullDown) 메가패널 제공</p>
              </div>
            </div>
            <div className="check-item">
              <CheckCircle2 size={18} className="check-icon" />
              <div>
                <strong>좌측 메뉴 (LNB)</strong>
                <p>상단 메뉴 선택 시, 해당 상위 메뉴에 소속된 5개 서브메뉴만 좌측에 격리되어 렌더링</p>
              </div>
            </div>
            <div className="check-item">
              <CheckCircle2 size={18} className="check-icon" />
              <div>
                <strong>DB 연동 아키텍처</strong>
                <p>타입스크립트 인터페이스 및 비동기 Service 계층(`MenuService`) 분리 완료</p>
              </div>
            </div>
          </div>

          <div className="quick-switch-section">
            <h4>다른 상위 메뉴로 빠른 전환 테스트</h4>
            <div className="quick-switch-chips">
              {allMenus.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`chip-btn ${m.id === currentMenu.id ? 'active' : ''}`}
                  onClick={() => onSelectMenu(m.id)}
                >
                  <span>{m.name}</span>
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
