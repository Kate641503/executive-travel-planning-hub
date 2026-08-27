import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { DocumentItem } from '../../types';
import {
  FileText,
  Download,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Filter,
  FileCheck,
  X,
  ExternalLink
} from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { documents, currentTrip, addDocument, deleteDocument, showToast } = useTravel();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedDocPreview, setSelectedDocPreview] = useState<DocumentItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form state
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<DocumentItem['type']>('E-Ticket');
  const [docCategory, setDocCategory] = useState<DocumentItem['category']>('Flights');
  const [docNotes, setDocNotes] = useState('');

  const tripDocs = documents.filter(d => d.tripId === (currentTrip?.id || 'trip-204'));

  const filteredDocs = tripDocs.filter(d => {
    if (activeCategory === 'ALL') return true;
    return d.category === activeCategory;
  });

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      showToast('Missing Title', 'Please enter a document title.', 'warning');
      return;
    }

    addDocument({
      tripId: currentTrip?.id || 'trip-204',
      title: docTitle,
      type: docType,
      category: docCategory,
      fileName: `${docTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      fileSize: '1.4 MB',
      uploadDate: 'August 27, 2026',
      status: 'Ready',
      notes: docNotes || 'Uploaded & verified by Catherine Ngina'
    });

    setIsUploadModalOpen(false);
    setDocTitle('');
    setDocNotes('');
  };

  const handleDownload = (doc: DocumentItem) => {
    showToast('Download Started', `Downloading ${doc.fileName}...`, 'success');
  };

  return (
    <div id="documents-vault-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              Encrypted Travel Vault
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Travel Documents & Vouchers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Boarding passes, visa waivers (ESTA), corporate hotel vouchers, executive NDAs, and travel insurance certificates.
          </p>
        </div>

        <button
          id="upload-doc-btn"
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'Flights', 'Hotels', 'Visa & Passports', 'Insurance', 'Agreements', 'Expenses'].map(cat => (
          <button
            key={cat}
            id={`filter-doc-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? 'All Files' : cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            id={`doc-card-${doc.id}`}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {doc.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{doc.title}</h4>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    doc.status === 'Ready'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">File Name:</span>
                  <span className="font-mono text-slate-800 font-medium truncate max-w-40">{doc.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">File Size:</span>
                  <span className="font-medium text-slate-700">{doc.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified On:</span>
                  <span className="text-slate-700">{doc.uploadDate}</span>
                </div>
                {doc.notes && (
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                    {doc.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  id={`preview-doc-${doc.id}`}
                  onClick={() => setSelectedDocPreview(doc)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(doc)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download</span>
                </button>
              </div>

              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedDocPreview.title}</h3>
                  <p className="text-xs text-slate-500">{selectedDocPreview.fileName} • {selectedDocPreview.fileSize}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDocPreview(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200/80 text-center space-y-3">
              <div className="w-16 h-20 bg-white border border-slate-300 rounded shadow-xs mx-auto flex flex-col items-center justify-center p-2">
                <FileText className="w-8 h-8 text-sky-600" />
                <span className="text-[9px] font-mono font-bold text-slate-500 mt-1">PDF</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Verified Executive Document</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pre-validated against Daniel Carter's corporate travel profile. Digital signature and PNR verified.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-700"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedDocPreview);
                  setSelectedDocPreview(null);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Upload Travel Document</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Inbound Flight E-Ticket"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={docCategory}
                    onChange={e => setDocCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="Flights">Flights</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Visa & Passports">Visa & Passports</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Agreements">Agreements</option>
                    <option value="Expenses">Expenses</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Document Type</label>
                  <select
                    value={docType}
                    onChange={e => setDocType(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="E-Ticket">E-Ticket</option>
                    <option value="Boarding Pass">Boarding Pass</option>
                    <option value="Visa">Visa Waiver (ESTA)</option>
                    <option value="Passport Copy">Passport Copy</option>
                    <option value="Hotel Voucher">Hotel Voucher</option>
                    <option value="Insurance">Insurance Policy</option>
                    <option value="NDA">Executive NDA</option>
                    <option value="Receipt">Expense Receipt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Verification Note</label>
                <textarea
                  rows={2}
                  value={docNotes}
                  onChange={e => setDocNotes(e.target.value)}
                  placeholder="e.g. Verified valid through Oct 2027 by Catherine Ngina"
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
