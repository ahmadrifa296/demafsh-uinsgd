<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Layanan Mahasiswa';

    protected static ?string $navigationLabel = 'Event & Seminar';

    protected static ?string $modelLabel = 'Event';

    protected static ?string $pluralModelLabel = 'Event & Seminar';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Kegiatan / Event')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Nama Event / Acara')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, ?string $state, Forms\Set $set): void {
                                if ($operation === 'create') {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug URL')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('category')
                            ->label('Jenis Kegiatan')
                            ->required()
                            ->default('Seminar')
                            ->datalist([
                                'Seminar',
                                'Workshop & Pelatihan',
                                'Diskusi Publik',
                                'Kompetisi',
                                'Konsolidasi',
                            ])
                            ->maxLength(100),
                        Forms\Components\TextInput::make('organizer')
                            ->label('Penyelenggara / Bidang')
                            ->placeholder('Departemen Kajian Strategis DEMA FSH')
                            ->maxLength(255),
                        Forms\Components\DateTimePicker::make('event_date')
                            ->label('Tanggal & Waktu Pelaksanaan')
                            ->native(false)
                            ->displayFormat('d M Y, H:i'),
                        Forms\Components\TextInput::make('location')
                            ->label('Lokasi / Tempat')
                            ->placeholder('Aula FSH Lt. 2 / Zoom Meeting')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi Acara')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Poster & Link Pendaftaran Google Form')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('registration_url')
                            ->label('Link Google Form Pendaftaran')
                            ->url()
                            ->placeholder('https://forms.gle/...')
                            ->helperText('Masukkan tautan Google Form lengkap (diawali https://).')
                            ->maxLength(500)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('poster')
                            ->label('Poster / Pamflet Event')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('events')
                            ->visibility('public')
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('is_registration_open')
                            ->label('Pendaftaran Masih Dibuka')
                            ->default(true),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Tampilkan di Website')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('event_date', 'asc')
            ->columns([
                Tables\Columns\ImageColumn::make('poster')
                    ->label('Poster')
                    ->disk('public')
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Nama Event')
                    ->searchable()
                    ->limit(45)
                    ->wrap(),
                Tables\Columns\TextColumn::make('category')
                    ->label('Jenis')
                    ->badge()
                    ->color('amber')
                    ->searchable(),
                Tables\Columns\TextColumn::make('event_date')
                    ->label('Jadwal')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('location')
                    ->label('Lokasi')
                    ->limit(25),
                Tables\Columns\ToggleColumn::make('is_registration_open')
                    ->label('Pendaftaran Buka'),
                Tables\Columns\ToggleColumn::make('is_published')
                    ->label('Tayang'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Status Tayang'),
                Tables\Filters\TernaryFilter::make('is_registration_open')
                    ->label('Status Pendaftaran'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
