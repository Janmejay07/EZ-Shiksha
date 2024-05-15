import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '..';

const StudyAssistant = () => {
  const [text, setText] = useState('Normalization reduces redundancy in a database. It organizes data into tables and prevents anomalies.');
  const [title, setTitle] = useState('DBMS Study Plan');
  const [result, setResult] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [toolResult, setToolResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${server}/documents`, { withCredentials: true })
      .then(({ data }) => setDocuments(data.data.documents || []))
      .catch(() => {});
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post(`${server}/documents/upload`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const document = data.data.document;
      setDocuments((current) => [document, ...current]);
      setSelectedDocument(document.id);
      toast.success('Document uploaded');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to upload document');
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter study material first.');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/study/plan`,
        {
          title,
          documentText: text,
          userPreference: {
            difficulty: 'easy',
            preferredStudyStyle: 'active recall',
            subjects: ['DBMS'],
          },
        },
        { withCredentials: true }
      );

      setResult(data.data.plan);
      toast.success('Study plan generated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to generate plan');
    } finally {
      setLoading(false);
    }
  };

  const handleTool = async (tool) => {
    if (!selectedDocument) {
      toast.error('Upload and select a document first.');
      return;
    }

    setLoading(true);
    setToolResult(null);
    try {
      const { data } = await axios.post(`${server}/study/${tool}`, {
        documentId: selectedDocument,
        title,
      }, { withCredentials: true });
      const key = tool === 'flashcards' ? 'flashcards' : tool;
      setToolResult({ type: tool, value: data.data[key] });
      toast.success(`${tool.charAt(0).toUpperCase() + tool.slice(1)} generated`);
    } catch (error) {
      toast.error(error?.response?.data?.message || `Unable to generate ${tool}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Study Assistant</h1>

        <div className="mb-6 rounded-2xl bg-slate-900 p-5 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Your study workspace</h2>
              <p className="text-slate-300">Upload material, then turn it into notes, quizzes, and flashcards.</p>
            </div>
            <label className="cursor-pointer rounded-xl bg-emerald-400 px-5 py-3 text-center font-semibold text-slate-950 hover:bg-emerald-300">
              Upload document
              <input type="file" accept=".pdf,.txt,.docx,.png,.jpg,.jpeg" onChange={handleUpload} className="hidden" />
            </label>
          </div>
          <select
            value={selectedDocument}
            onChange={(event) => setSelectedDocument(event.target.value)}
            className="mt-4 w-full rounded-xl border-0 bg-white p-3 text-slate-800"
          >
            <option value="">Select an uploaded document for AI tools</option>
            {documents.map((document) => (
              <option key={document.id} value={document.id}>{document.originalFileName}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {[
            ['notes', 'Generate notes'],
            ['quiz', 'Create quiz'],
            ['flashcards', 'Make flashcards'],
          ].map(([tool, label]) => (
            <button key={tool} onClick={() => handleTool(tool)} disabled={loading} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 disabled:opacity-50">
              {label}
            </button>
          ))}
        </div>

        {toolResult && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="mb-3 text-xl font-semibold text-slate-800">Generated {toolResult.type}</h2>
            {toolResult.type === 'flashcards' ? (
              <div className="grid gap-3 md:grid-cols-2">
                {toolResult.value?.cards?.map((card, index) => <div key={index} className="rounded-xl bg-white p-4"><p className="font-semibold">{card.question}</p><p className="mt-2 text-slate-600">{card.answer}</p></div>)}
              </div>
            ) : toolResult.type === 'quiz' ? (
              <div className="space-y-3">{toolResult.value?.questions?.map((question, index) => <div key={index} className="rounded-xl bg-white p-4"><p className="font-semibold">{index + 1}. {question.question}</p><p className="mt-2 text-slate-600">Answer: {question.correctAnswer}</p></div>)}</div>
            ) : (
              <div className="whitespace-pre-wrap rounded-xl bg-white p-4 text-slate-700">{typeof toolResult.value === 'string' ? toolResult.value : JSON.stringify(toolResult.value, null, 2)}</div>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-medium text-slate-700">Plan title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                placeholder="e.g. DBMS Revision"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">Study material</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                placeholder="Paste your notes or chapter text here"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Generating...' : 'Generate Study Plan'}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">Generated plan</h2>

            {!result ? (
              <p className="text-slate-500">Your plan will appear here.</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Title</p>
                  <h3 className="text-2xl font-bold text-slate-800">{result.title}</h3>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Subjects</p>
                  <p className="text-slate-700">{result.subjects?.join(', ')}</p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Study style</p>
                  <p className="text-slate-700">{result.studyStyle}</p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Recommended actions</p>
                  <ul className="list-disc space-y-2 pl-5 text-slate-700">
                    {result.recommendedActions?.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Schedule</p>
                  <div className="space-y-3 pt-2">
                    {result.schedule?.map((item, index) => (
                      <div key={index} className="rounded-lg border border-slate-200 bg-white p-3">
                        <p className="font-semibold text-slate-800">{item.day}</p>
                        <p className="text-slate-700">{item.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAssistant;
